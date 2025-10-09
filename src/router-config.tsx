import Layout from "./layout";
import GetStarted from "./get-started";
import TablePage from "./table-page";

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
        path: "/table-page",
        element: <TablePage />,
      },
    ],
  },
];

export default routerconfig;
