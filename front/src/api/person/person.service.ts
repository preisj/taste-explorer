import { api } from "../index";
import { Person } from "../../interfaces/PersonInterface";

export interface loginPeople {
  email: string;
  token?: string;
  password: string;
  name?: string;
  id?: string;
}

export function addPerson(person: Omit<Person, "id">) {
  if (!person.role) {
    person.role = "user";
  }
  return api
    .post<Person>("/person/add", person)
    .then((res) => res.data);
}

export function editPerson(person: Person) {
  return api.put(`/person/${person.id}/update`, person).then((res) => res.data);
}

export function editPassword(person: Person) {
  return api
    .put(`/persons/${person.id}/update`, person)
    .then((res) => res.data);
}

export function getPerson(personId: string) {
  return api.get<Person>(`/person/${personId}/show`).then((res) => res.data);
}

export function getPeople() {
  return api.get<Person[]>(`/person/all`).then((res) => res.data);
}

export function deletePerson(personId: string) {
  return api.delete(`/persons/${personId}/delete`).then((res) => res.data);
}

export function validateLogin(person: loginPeople) {
  return api.post<loginPeople>("/login", person).then((res) => res.data);
}
