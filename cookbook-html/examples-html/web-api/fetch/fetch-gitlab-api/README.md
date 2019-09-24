# GitLab API

* https://docs.gitlab.com/ee/api/
* https://gitlab.com/help/api/README.md


## Personal Access Tokens

* https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html
* Easy peasy
* no expiry date needed



## Projects

* https://gitlab.com/api/v4/projects/14344097 << evereverland.github.io

Gives

* https://gitlab.com/evereverland/evereverland.gitlab.io/blob/master/README.md
* https://gitlab.com/api/v4/projects/14344097/issues
* https://gitlab.com/api/v4/projects/14344097/repository/branches
* https://gitlab.com/api/v4/projects/14344097/labels
* https://gitlab.com/api/v4/projects/14344097/events
* https://gitlab.com/api/v4/projects/14344097/members

## User

* https://gitlab.com/api/v4/user/
* https://gitlab.com/api/v4/users/4248585/projects

## Tree

docs

https://docs.gitlab.com/ee/api/repositories.html

links

* https://gitlab.com/api/v4/projects/14344097/repository/tree
* https://gitlab.com/api/v4/projects/14344097/repository/tree?recursive=true
* https://gitlab.com/api/v4/projects/14344097/repository/tree?path=public&recursive=true

## Files

docs

* https://docs.gitlab.com/ee/api/repositories.html

links

* https://gitlab.com/api/v4/projects/443787/repository/files/pajamas%2Fpajamas-pattern%2Eai?ref=master

////

curl
--request POST \
--header 'PRIVATE-TOKEN: PgzPsmy9LkUqkgiC5WqZ' \
--header "Content-Type: application/json" \
--data '{"branch": "master", "author_email": "t.armour@gmail.com", "author_name": "Theo Armour", \
"content": "some content", "commit_message": "create a new file"}' \
'https://gitlab.com/api/v4/projects/13175347/repository/files/test%2Emd'


curl --request PUT \
--header "PRIVATE-TOKEN: PgzPsmy9LkUqkgiC5WqZ" \
--header "Content-Type: application/json" \
--data '{"branch": "master", "author_email": "author@example.com", "author_name": "Firstname Lastname", "content": "some content \nabc 123\ntra la]nhello world", "commit_message": "create a new file"}' \
https://gitlab.com/api/v4/projects/13175347/repository/files/project2%2Emd

curl --header "PRIVATE-TOKEN": "PgzPsmy9LkUqkgiC5WqZ" \
https://gitlab.com/api/v4/projects/13175347/repository/files/test%2Ejs?ref=master
