import TabPanel from "../UI/TabPanel";
import TabPaper from "../UI/TabPaper";
import CreateBlockchain from "./CreateBlockchain";
import ListBlockchain from "./ListBlockchain";

const labels = [
    {
      name: "Minerar Bloco",
      level: 0,
    },
    {
      name: "Cadeia de Blocos",
      level: 1,
    },
  ];


function Blockchain() {
    return (
        <TabPaper labels={labels}>
          <TabPanel key="0" index={labels[0].level}>
            <CreateBlockchain />
          </TabPanel>
          <TabPanel key="1" index={labels[1].level}>
            <ListBlockchain />
          </TabPanel>
        </TabPaper>
      )
}

export default Blockchain;