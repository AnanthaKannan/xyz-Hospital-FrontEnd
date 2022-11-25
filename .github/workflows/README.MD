## Push
we can run the job, while push the code

## Pull Request
we can run the job, while create the pull request. But pull request have some types for example we have **close**, **assign** like that. so by mention the type, the job will run.

## Cron
[Cron job reference](https://crontab.guru/)
we can run the jobs by using cron. we have can the job like hourly, minutes depends on the cron setting

## Trigger workflow manually
[Dispatch Event in git-hub](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event) we can run the job, by calling the api. Basically git-hub provided related to this api.

[reference file](./dispatch.yml)

you can use this to master branch only
```curl
curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer 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" \
  https://api.github.com/repos/AnanthaKannan/digitalHospital-FrontEnd/dispatches \
  -d '{"event_type":"build","client_payload":{"unit":false,"env":"dev"}}'
```
Note: **event_type : build** build is you have to mention the type in the dispatch.yml file

## Filter Branch and Tag
[Filter workflow by Branch, tag and path](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

[reference file](./branch.yml)

## Environment Variable
[Default and custom environment variable](https://docs.github.com/en/actions/learn-github-actions/environment-variables)

[reference file](./env.yml)