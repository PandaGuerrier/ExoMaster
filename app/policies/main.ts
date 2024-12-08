/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

export const policies = {
  DefaultExercisePolicy: () => import('#policies/default_exercise_policy'),
  DefaultSubjectPolicy: () => import('#policies/default_subject_policy'),
  ExercisePolicy: () => import('#policies/exercise_policy'),
  SubjectPolicy: () => import('#policies/subject_policy')
}
