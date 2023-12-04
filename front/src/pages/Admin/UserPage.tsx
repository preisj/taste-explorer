import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { AddUser } from "./AddUser/AddUser";
import { AddRecipe } from "./AddRecipe/AddRecipe";
import { UserTable } from "./AddUser/UserTable";
import { RecipesTable } from "./AddRecipe/RecipesTable";
// import { SalesReport } from "./Reports/SalesReport";

export function UserPage() {
  return (
    <HeaderTemplate>
      <div>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab color={"#000"}>Receitas</Tab>
            <Tab color={"#000"}>Usuários</Tab>
            <Tab color={"#000"}>Adicionar Receita</Tab>
            <Tab color={"#000"}>Adicionar Usuário</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <RecipesTable />
            </TabPanel>
            <TabPanel>
              <UserTable />
            </TabPanel>
            <TabPanel>
              <AddRecipe />
            </TabPanel>
            <TabPanel>
              <AddUser />
            </TabPanel>
            {/*<TabPanel>*/}
            {/*  <div id="echartsContainer" style={{ height: "90vh" }}>*/}
            {/*    <SalesReport />*/}
            {/*  </div>*/}
            {/*</TabPanel>*/}
          </TabPanels>
        </Tabs>
      </div>
    </HeaderTemplate>
  );
}
