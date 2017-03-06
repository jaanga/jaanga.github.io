%dataloading
clear all
close all

%path to dataset and dataset name
dataRoot = '';
dataset  = 'logs/log6'; %or 'log2'
name     = [dataRoot dataset];

%open the file
file = fopen(name, 'r');
if(file == -1)
    disp('Problem opening file!');
end

% Map message types for recognizing blocks of data
mt_finishedWithFeature  = 3;
mt_finishedWithGroup    = 4;

%Data structures
guessNumPts       = 3000;
guessNumPoses     = 1000; %pre-allocation
points_w          = zeros(3,guessNumPts); %points p in 'world' coordinates
pointTracks{1}    = []; %Tracks of points with cell index matching column in points_w
Tcw               = zeros(3,guessNumPts); %Translation from world to camera coordinates, each column is one image
Wcw               = zeros(3,guessNumPts); %Exponential coordinates of rotation from world to camera coordinates
Twc               = zeros(3,guessNumPts);

%Coordinate transformations
%p_c(:,j) = R(Wcw(:,i))p_w(:,j) + Tcw(:,i) (where R(Wcw) computes the rotation matrix via
%Rodrigues)
%Tcw/Wcw(:,i) is the transformation from the starting point/world frame to
%the camera at time i
%p_c(:,j) is the point j in the coordinates of the camera frame at time i

pointCounter = 1;
poseCounter  = 1;
maxPoseId    = 1;
%read through the file
while(~feof(file))
    msgType = fread(file, 1, 'int'); %what kind of message
    
    if(msgType == mt_finishedWithFeature) %Feature
        pointId = fread(file, 1, 'uint64'); %not necessary
        
        p_w                       = fread(file, 4, 'double'); %read world coordinates of point
        points_w(:, pointCounter) = p_w(1:3); %store point
        
        numTracks = fread(file, 1, 'int'); %How many frames was this seen in
        poseIds   = fread(file, numTracks, 'uint64') + 1; %The (originally zero-based) time indexes at which the feature was seen
        tracks    = fread(file, 4*numTracks, 'double'); %Load the calibrated image coordinates
        tracks    = reshape(tracks, 4, numTracks);
        tracks    = tracks(1:2,:); %Drop the extra 2 rows
        
        pointTracks{pointCounter} = zeros(3, numTracks); %Store the tracks at the cell for this feature
        pointTracks{pointCounter}(1,:)   = poseIds; %The set of poses (matching Tcw/Wcw) where these were seen
        pointTracks{pointCounter}(2:3,:) = tracks; %The track info
        
        pointCounter = pointCounter + 1; %keep track of how many points we're at
    elseif(msgType == mt_finishedWithGroup)
        poseId = fread(file, 1, 'uint64') + 1; %Get the zero-based pose id ('timestamp')
        
        thisTcw = fread(file, 4, 'double'); %get the pose
        thisWcw = fread(file, 4, 'double');
        
        R = rodrigues(thisWcw(1:3));
        thisTwc(1:3) = -R'*thisTcw(1:3);
        Twc(:,poseId) = thisTwc(1:3);
        
        Tcw(:,poseId) = thisTcw(1:3); %Store pose
        Wcw(:,poseId) = thisWcw(1:3);
        
        poseCounter = poseCounter + 1; %Keep track of how many we have
        if(poseId > maxPoseId)
            maxPoseId = poseId;
        end
    else
        disp(sprintf('Bad message type! %d',msgType));
    end
    
end
fclose(file);

points_w = points_w(:,1:pointCounter-1); %Keep only the the number of tracks/poses we found
Tcw = Tcw(:,1:maxPoseId);
Wcw = Wcw(:,1:maxPoseId);
disp(sprintf('Done reading file. Loaded %d points and %d poses.', pointCounter-1, poseCounter-1));

%Visualization  of the loaded pointcloud
figure(1);
plot3(points_w(1,:), points_w(2,:), points_w(3,:), '.b'); hold on;
plot3(Twc(1,:), Twc(2,:), Twc(3,:), 'r'); %Show just as sanity check, correct thing to visualize is Twc
hold on;
