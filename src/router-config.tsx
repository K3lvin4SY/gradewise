import Layout from "./layout";
import GetStarted from "./get-started";
import TablePage from "./table-page";
import ProgramSelector from "./program-selector";
import NotFound from "./not-found";

const routerconfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <GetStarted />,
      },
      {
        path: "/program-selector/",
        element: <ProgramSelector />,
      },
      {
        path: "/table-page/",
        element: <TablePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routerconfig;
