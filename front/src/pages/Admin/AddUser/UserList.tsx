import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Person } from "../../../interfaces/PersonInterface";
import { DotsThree, MagnifyingGlass, Pencil, Trash, ArrowClockwise } from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "./ModalDelete";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface UserTableProps {
    people: Array<Person>;
    onEdit: (person: Person) => void;
    onDelete: (person: Person) => void;
}

export const UserList: React.FunctionComponent<UserTableProps> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [personSelected, setPersonSelected] = useState<Person | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");


    const personFilter = props.people.filter((person) =>
        person.firstName.toLowerCase().includes(filter.toLowerCase()) &&
        person.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
        (roleFilter === "" || (person?.role && person.role.toLowerCase() === roleFilter.toLowerCase()))
    );

    const generateReport = () => {
        const doc = new jsPDF();

        const tableColumn = ["First Name", "Last Name", "Email", "Role", "Phone", "Address", "ID"];
        const tableRows: (string | number)[][] = [];

        // Add data to tableRows
        personFilter.forEach((person) => {
            const userData = [person.firstName, person.lastName, person.email, person.role, person.phone, person.address, person.id];
            // @ts-ignore
            tableRows.push(userData);
        });

        // Add table to the PDF document
        autoTable(doc, { columns: tableColumn, body: tableRows, startY: 20 });

        // Save the PDF
        doc.save("user-list.pdf");
    };

    const generateCSV = () => {
        const tableColumn = ["First Name", "Last Name", "Email", "Role", "Phone", "Address", "ID"];
        const tableRows: (string | number)[][] = [];

        // Add data to tableRows
        personFilter.forEach((person) => {
            const userData = [person.firstName, person.lastName, person.email, person.role, person.phone, person.address, person.id];
            // @ts-ignore
            tableRows.push(userData);
        });

        const csvContent = "data:text/csv;charset=utf-8," + tableColumn.join(",") + "\n" + tableRows.map(row => row.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "user-list.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    marginBottom: "10px",
                    marginTop: "10px",
                    alignItems: "center",
                }}
            >
                <ArrowClockwise
                    onClick={() => window.location.reload()}
                    color="#696969"
                    className="h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700 rounded-sm"
                />
                <div>
                    <button onClick={generateReport}>Generate PDF report</button>
                </div>
                <div>
                    <button onClick={generateCSV}>Generate CSV report</button>
                </div>
                <div className="flex items-center rounded mb-2 w-full">
                    <MagnifyingGlass
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        color="#696969"
                        className={clsx(
                            "h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700",
                            {
                                "rounded-l-sm": isSearchOpen,
                                "rounded-sm": !isSearchOpen,
                            }
                        )}
                    />

                    <input
                        className={clsx(
                            "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
                            {
                                "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
                                isSearchOpen,
                                "w-0 border-l-0 border-r-0": !isSearchOpen,
                            }
                        )}
                        placeholder="First Name"
                        onChange={(ev) => setFilter(ev.target.value)}
                        value={filter}
                    />
                    <input
                        className={clsx(
                            "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
                            {
                                "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
                                    isSearchOpen,
                                "w-0 border-l-0 border-r-0": !isSearchOpen,
                            }
                        )}
                        placeholder="Email"
                        onChange={(ev) => setEmailFilter(ev.target.value)}
                        value={emailFilter}
                    />
                    <input
                        className={clsx(
                            "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
                            {
                                "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
                                    isSearchOpen,
                                "w-0 border-l-0 border-r-0": !isSearchOpen,
                            }
                        )}
                        placeholder="Role"
                        onChange={(ev) => setRoleFilter(ev.target.value)}
                        value={roleFilter}
                    />
                </div>
            </div>

            <Table
                variant="striped"
                colorScheme="zinc"
                className="bookTable"
            >
                <Thead>
                    <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Phone</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {personFilter.length > 0 ? (
                        personFilter.map((person) => (
                            <Tr key={person.id}>
                                <Td>{person.firstName}</Td>
                                <Td>{person.lastName}</Td>
                                <Td>{person.email}</Td>
                                <Td>{person.role === "admin" ? "Admin" : "User"}</Td>
                                <Td>{person.phone}</Td>

                                <Td>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Menu>
                                            <MenuButton
                                                style={{
                                                    background: "none",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                as={Button}
                                            >
                                                <DotsThree size={28} />
                                            </MenuButton>
                                            <MenuList style={{ minWidth: "120px" }}>
                                                <MenuItem onClick={() => props.onEdit(person)}>
                                                    <div style={{ cursor: "pointer" }}>
                                                        <span
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                          <Pencil
                                                              size={22}
                                                              color="#8f8f8f"
                                                              className="mr-2"
                                                          />{" "}
                                                            Edit
                                                        </span>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setPersonSelected(person);
                                                        setIsModalVisible(true);
                                                    }}
                                                >
                                                    <div style={{ cursor: "pointer" }}>
                                                        <span
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                          <Trash
                                                              size={22}
                                                              color="#8f8f8f"
                                                              className="mr-2"
                                                          />{" "}
                                                            Delete
                                                        </span>
                                                    </div>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>No users registered</td>
                        </tr>
                    )}
                </Tbody>
                {isModalVisible && personSelected ? (
                    <ModalDelete
                        text={personSelected.firstName}
                        onCloseModal={() => {
                            setIsModalVisible(false);
                            setPersonSelected(null);
                        }}
                        confirmDelete={() => {
                            props.onDelete(personSelected);
                            setIsModalVisible(false);
                            setPersonSelected(null);
                        }}
                    />
                ) : null}
            </Table>
        </>
    );
};
