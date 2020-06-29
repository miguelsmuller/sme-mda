export interface User {
  uid: string;
  name: string;
  email: string;
  image: string;
  escola: string;
  alunos?: Array<any>;
}
