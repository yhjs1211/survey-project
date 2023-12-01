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

테스트 링크

> 1. http://localhost:4000/graphql
> 2. VSCode 내 콘솔창 경로 접속 가능 ( 위와 동일 )

### ERD

<img width="1162" alt="image" src="https://github.com/yhjs1211/survey-project/assets/122883378/d0d44d35-5df7-4fc4-b7ea-390fb709058f">


### API (Query & Mutation)

Survey ( 설문지 )

> - 생성 : createSurvey( $title: String!, $content: String! )
>
> createSurvey( createSurveyInput: { title: $title, content: $content })

> - 수정 : updateSurvey( $id: Int!, $title: String, $content: String, $sequence: JSON )
>
> updateSurvey( updateSurveyInput: { $id: Int!, title: $title, content: $content, sequence: $sequence })

> - 삭제 : deleteSurvey( $id: Int! )
>
> deleteSurvey( id: $id )

> - 단일 조회 : getSurvey( $id: Int! )
>
> getSurvey( id: $id )

> - 전체 조회 : getAllSurveys()
>
> getAllSurveys()

---

Question ( 문항 )

> - 생성 : createQuestion( $content: String! )
>
> createQuestion( createQuestionInput: { content: $content })

> - 수정 : updateQuestion( $id: Int!, $content: String! )
>
> updateQuestion( updateQuestionInput: { id: $id, content: $content })

> - 삭제 : deleteQuestion( $id: Int! )
>
> deleteQuestion( id: $id )

> - 단일 조회 : getQuestion( $id: Int! )
>
> getQuestion( id: $id )

> - 전체 조회 : getAllQuestions()
>
> getAllQuestions()

---

Item ( 선택지 )

> - 생성 | 수정 : upsertItemByIds( $surveyId: Int!, $questionId: Int!, $choice: JSON! )
>
> upsertItemByIds( itemInput: { surveyId: $surveyId, questionId: $questionId, choice: $choice })

> - 삭제 : deleteItem( $surveyId: Int!, $questionId: Int! )
>
> deleteItem( surveyId: $surveyId, questionId: $questionId )

> - 단일 선택지 조회 : getItemByIds( $surveyId: Int!, $questionId: Int! )
>
> getItemByIds( getItem: { surveyId: $surveyId, questionId: $questionId })

> - 설문지 별 해당 문항 내 선택지 조회 : getItemBQuestionId( $surveyId: Int, $questionId: Int )
>
> getItemByQuestionId( getItems: { surveyId: $surveyId, questionId: $questionId })

---

Result ( 결과 )

> - 생성 : createResult( $surveyId: Int!, $choice: JSON! )
>
> createResult( createResultInput: { surveyId: $surveyId, choice: $choice })

> - 수정 : updateResult( $id: Int!, $choice: JSON! )
>
> updateResult( updateResultInput: { id: $id, choice: $choice })

> - 삭제 : deleteResult( $id: Int! )
>
> deleteResult( id: $id )

> - 단일 결과 조회 : getResultById( $id: Int! )
>
> getResultById( id: $id )

> - 설문지 별 결과 내역 조회 : findResultsBySurveyId( $surveyId: Int! )
>
> getResultsBySurveyId( surveyId: $surveyId )
