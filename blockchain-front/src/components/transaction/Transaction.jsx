import TabPaper from '../UI/TabPaper';
import TabPanel from "../UI/TabPanel";
import ListTransaction from './ListTransaction';
import CreateTransaction from './CreateTransaction';

const labels = [
    {
      name: "Transações",
      level: 0,
    },
    {
      name: "Criar Transação",
      level: 1,
    },
  ];

function Transaction() {
    return (
        <TabPaper labels={labels}>
          <TabPanel key="0" index={labels[0].level}>
            <ListTransaction />
          </TabPanel>
          <TabPanel key="1" index={labels[1].level}>
            <CreateTransaction />
          </TabPanel>
        </TabPaper>
      )
}

export default Transaction;