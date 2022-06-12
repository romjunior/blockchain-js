import TabPaper from '../UI/TabPaper';
import TabPanel from "../UI/TabPanel";
import ListWallet from "./ListWallet";
import CreateWallet from './CreateWallet';

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
      <TabPanel key="0" index={labels[0].level}>
        <ListWallet />
      </TabPanel>
      <TabPanel key="1" index={labels[1].level}>
        <CreateWallet />
      </TabPanel>
    </TabPaper>
  );
}

export default Wallet;
