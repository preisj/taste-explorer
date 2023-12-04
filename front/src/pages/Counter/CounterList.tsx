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
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  DotsThree,
  MagnifyingGlass,
  Pencil,
  Trash,
  ArrowClockwise,
} from "phosphor-react";
import clsx from "clsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Ingredient } from "../../interfaces/IngredientInterface";
import { ModalDelete } from "../Admin/AddUser/ModalDelete";

interface CounterTableProps {
  ingredients: Array<Ingredient>;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
}

export const CounterList: React.FunctionComponent<CounterTableProps> = (
  props
) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingSelected, setIngSelected] = useState<Ingredient | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const ingFilter = props.ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(filter.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Quantidade", "Última Atualização", "ID"];
    const tableRows: (string | number)[][] = [];

    // Add data to tableRows
    ingFilter.forEach((ingredient) => {
      const ingData = [ingredient.name, ingredient.qtd, ingredient.id];
      tableRows.push(ingData);
    });

    // Add table to the PDF document
    autoTable(doc, { columns: tableColumn, body: tableRows, startY: 20 });

    // Save the PDF
    doc.save("ingredient-list.pdf");
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
            placeholder="Search"
            onChange={(ev) => setFilter(ev.target.value)}
            value={filter}
          />

          {isSearchOpen && (
            <Select
              className={clsx(
                "w-[29%] border-[1px] border-l-0 placeholder border-gray-800 border-r-0",
                {
                  "w-[29%] border-[1px] border-l-0 placeholder border-gray-800 border-r-0":
                    isSearchOpen,
                }
              )}
              onChange={(ev) => setTypeFilter(ev.target.value)}
              value={typeFilter}
            ></Select>
          )}
        </div>
      </div>

      <Table variant="striped" colorScheme="zinc" className="CounterTable">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Quantidade</Th>
            <Th>Tags</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingFilter.length > 0 ? (
            ingFilter.map((ingredient) => (
              <Tr key={ingredient.id}>
                <Td>{ingredient.name}</Td>
                <Td>{ingredient.qtd}</Td>
                <Td>{ingredient.tags}</Td>

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
                        <MenuItem onClick={() => props.onEdit(ingredient)}>
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
                              Editar
                            </span>
                          </div>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setIngSelected(ingredient);
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
              <td colSpan={8}>Sem ingredientes cadastrados</td>
            </tr>
          )}
        </Tbody>
        {isModalVisible && ingSelected ? (
          <ModalDelete
            text={ingSelected.name}
            onCloseModal={() => {
              setIsModalVisible(false);
              setIngSelected(null);
            }}
            confirmDelete={() => {
              props.onDelete(ingSelected);
              setIsModalVisible(false);
              setIngSelected(null);
            }}
          />
        ) : null}
      </Table>
    </>
  );
};
