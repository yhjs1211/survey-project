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
> >
> > createSurvey(createSurveyInput: {title: $title, content: $content})
>
> > - 수정 : updateSurvey($id: Int!, $title: String, $content: String, $sequence: JSON)
> >
> > updateSurvey(updateSurveyInput: {$id: Int!, title: $title, content: $content, sequence: $sequence})
>
> > - 삭제 : deleteSurvey($id: Int!)
> >
> > deleteSurvey(id: $id)
>
> > - 단일 조회 : survey($id:Int!)
> >
> > survey(id: $id)
>
> > - 전체 조회 : surveys()
> >
> > surveys()

---

> Question ( 문항 )
>
> > - 생성 : createQuestion($content: String!)
> >
> > createQuestion( createQuestionInput: {content: $content})
>
> > - 수정 : updateQuestion($id: Int!, $content: String!)
> >
> > updateQuestion( updateQuestionInput: {id: $id, content: $content})
>
> > - 삭제 : deleteQuestion($id: Int!)
> >
> > deleteQuestion(id: $id)
>
> > - 단일 조회 : question($id: Int!)
> >
> > question(id: $id)
>
> > - 전체 조회 : questions()
> >
> > questions()

---

> Item ( 선택지 )
>
> > - 생성 | 수정 : upsertItemByIds($surveyId: Int!, $questionId: Int!, $choice: JSON!)
> >
> > upsertItemByIds( itemInput: {surveyId: $surveyId, questionId: $questionId, choice: $choice})
>
> > - 삭제 : deleteItem($surveyId: Int!, $questionId: Int!)
> >
> > deleteItem(surveyId: $surveyId, questionId: $questionId)
>
> > - 단일 문항 내 선택지 조회 : findItemByIds($surveyId: Int!, $questionId: Int!)
> >
> > findItemByIds( getItem: {surveyId: $surveyId, questionId: $questionId})
>
> > - 동일 설문지 내 문항 & 선택지 조회 : findItemBySurveyId($surveyId: Int, $questionId: Int)
> >
> > findItemBySurveyId( getItems: {surveyId: $surveyId, questionId: $questionId})
>
> > - 동일 문항이 속한 설문지 및 선택지 조회 : findItemBQuestionId($surveyId: Int, $questionId: Int)
> >
> > findItemByQuestionId( getItems: {surveyId: $surveyId, questionId: $questionId})
