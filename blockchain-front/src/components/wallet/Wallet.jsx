import TabPaper from '../UI/TabPaper';
import TabPanel from "../UI/TabPanel";
import ListWallet from "./ListWallet";

const labels = [
  {
    name: "Carteiras",
    level: 0,
  },
  {
    name: "Criar Carteiras",
    level: 1,
  },
];

function Wallet() {
  return (
    <TabPaper labels={labels}>
      <TabPanel index={labels[0].level}>
        <ListWallet />
      </TabPanel>
      <TabPanel index={labels[1].level}>Item Two</TabPanel>
    </TabPaper>
  );
}

export default Wallet;
