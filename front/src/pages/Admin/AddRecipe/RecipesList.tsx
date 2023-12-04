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
import { Recipe } from "../../../interfaces/RecipeInterface";
import {
  DotsThree,
  MagnifyingGlass,
  Pencil,
  Trash,
  ArrowClockwise,
} from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "../AddUser/ModalDelete";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const cuisineTypes = [
  { value: "italian", label: "Italian" },
  { value: "chinese", label: "Chinese" },
  { value: "mexican", label: "Mexican" },
  { value: "indian", label: "Indian" },
  { value: "japanese", label: "Japanese" },
  { value: "french", label: "French" },
  { value: "thai", label: "Thai" },
  { value: "greek", label: "Greek" },
  { value: "spanish", label: "Spanish" },
  { value: "brazilian", label: "Brazilian" },
  { value: "middleEastern", label: "Middle Eastern" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "korean", label: "Korean" },
  { value: "african", label: "African" },
  { value: "mediterranean", label: "Mediterranean" },
];

interface RecipesTableProps {
  recipes: Array<Recipe>;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
}

export const RecipesList: React.FunctionComponent<RecipesTableProps> = (
  props
) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipeSelected, setRecipeSelected] = useState<Recipe | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const recipeFilter = props.recipes.filter(
    (recipe) => recipe.title.toLowerCase().includes(filter.toLowerCase()) //&&
    //recipe.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
    //(typeFilter === "" || (recipe?.type && recipe.type.toLowerCase() === typeFilter.toLowerCase()))
  );

  const generateReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Title", "Description", "Instructions"];
    const tableRows: (string | number)[][] = [];

    // Add data to tableRows
    recipeFilter.forEach((recipe) => {
      const recipeData = [
        recipe.title,
        recipe.description,
        recipe.instructions,
      ];
      tableRows.push(recipeData);
    });

    // Add table to the PDF document
    autoTable(doc, { columns: tableColumn, body: tableRows, startY: 20 });

    // Save the PDF
    doc.save("recipe-list.pdf");
  };

  const generateCSV = () => {
    const tableColumn = [
      "Title",
      "Author",
      "Description",
      "Price",
      "Type",
      "ID",
    ];
    const tableRows: (string | number)[][] = [];

    // Add data to tableRows
    recipeFilter.forEach((recipe) => {
      const recipeData = [
        recipe.title,
        recipe.description,
        recipe.instructions,
        recipe.id,
      ];
      tableRows.push(recipeData);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      tableColumn.join(",") +
      "\n" +
      tableRows.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "recipe-list.csv");
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
            placeholder="Search"
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
            placeholder="Author"
            onChange={(ev) => setAuthorFilter(ev.target.value)}
            value={authorFilter}
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
            >
              <option value="">All</option>
              {cuisineTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>

      <Table variant="striped" colorScheme="zinc" className="recipeTable">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Instructions</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {recipeFilter.length > 0 ? (
            recipeFilter.map((recipe) => (
              <Tr key={recipe.id}>
                <Td>{recipe.title}</Td>
                <Td>{recipe.description}</Td>
                <Td>{recipe.instructions}</Td>

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
                        <MenuItem onClick={() => props.onEdit(recipe)}>
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
                            setRecipeSelected(recipe);
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
              <td colSpan={8}>No recipes registered</td>
            </tr>
          )}
        </Tbody>
        {isModalVisible && recipeSelected ? (
          <ModalDelete
            text={recipeSelected.title}
            onCloseModal={() => {
              setIsModalVisible(false);
              setRecipeSelected(null);
            }}
            confirmDelete={() => {
              props.onDelete(recipeSelected);
              setIsModalVisible(false);
              setRecipeSelected(null);
            }}
          />
        ) : null}
      </Table>
    </>
  );
};
