import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Person } from "../../../interfaces/PersonInterface";
import { UserList } from "./UserList";
import { deletePerson, getPeople } from "../../../api/person/person.service";

export function UserTable() {
  const [people, setPeople] = useState<Person[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchPeople = () => {
    getPeople().then((data) => setPeople(data));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const onEditPerson = (person: Person) => {
    navigate(`/person/${person.id}/update`);
  };

  const onDeletePerson = async (person: Person) => {
    try {
      await deletePerson(person.id);
      toast({
        position: "top-right",
        description: "Person deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fetchPeople();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Error",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <UserList
        onDelete={onDeletePerson}
        onEdit={onEditPerson}
        people={people}
      />
    </>
  );
}
