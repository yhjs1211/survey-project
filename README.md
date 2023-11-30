# Survey Project

### Installation

```bash
# 라이브러리 설치
$ npm install

# Docker pg Container 실행
$ docker-compose up -d
```

### Running the app

```bash
# 서버 실행
$ npm run start
```

### ERD

![image](https://github.com/yhjs1211/survey-project/assets/122883378/c9a1f341-ee5c-4b04-8de7-768c61c66f39)

### API (Query & Mutation)

> Survey ( 설문지 )
>
> > - 생성 : createSurvey($title: String!, $content: String!)
>
> > > createSurvey(createSurveyInput: {title: $title, content: $content})
> >
> > - 수정 : updateSurvey($id: Int!, $title: String, $content: String, $sequence: JSON)
>
> > > updateSurvey(updateSurveyInput: {$id: Int!, title: $title, content: $content, sequence: $sequence})
> >
> > - 삭제 : deleteSurvey($id: Int!)
>
> > > deleteSurvey(id: $id)
> >
> > - 단일 조회 : survey($id:Int!)
>
> > > survey(id: $id)
> >
> > - 전체 조회 : surveys()
>
> > > surveys()
