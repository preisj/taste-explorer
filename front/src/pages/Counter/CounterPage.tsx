import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { CounterTable } from "./CounterTable";
import { AddIngredient } from "./AddIngredient";

export function CounterPage() {
  return (
    <HeaderTemplate>
      <div>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab color={"#000"}>Ingredientes</Tab>
            <Tab color={"#000"}>Adicionar Ingredientes</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CounterTable />
            </TabPanel>
            <TabPanel>
              <AddIngredient />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </HeaderTemplate>
  );
}
