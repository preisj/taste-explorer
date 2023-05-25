import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { AddUser } from "./AddUser/AddUser";
import { AddBook } from "./AddBook/AddBook";
import { UserTable } from "./AddUser/UserTable";
import { BooksTable } from "./AddBook/BooksTable";
import { SalesReport } from "./Reports/SalesReport";

export function UserPage() {
  return (
      <HeaderTemplate>
        <div>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab color={"#000"}>Books</Tab>
              <Tab color={"#000"}>Users list</Tab>
              <Tab color={"#000"}>Add book</Tab>
              <Tab color={"#000"}>Add user</Tab>
              <Tab color={"#000"}>Sales reports</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <BooksTable />
              </TabPanel>
              <TabPanel>
                <UserTable />
              </TabPanel>
              <TabPanel>
                <AddBook />
              </TabPanel>
              <TabPanel>
                <AddUser />
              </TabPanel>
              <TabPanel>
                <div id="echartsContainer" style={{ height: "90vh" }}>
                  <SalesReport />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </HeaderTemplate>
  );
}
