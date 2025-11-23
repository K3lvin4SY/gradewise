import Layout from "./layout";
import GetStarted from "./get-started";
import TablePage from "./table-page";
import ProgramSelector from "./program-selector";
import NotFound from "./not-found";
import AboutPage from "./about-page";

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
        path: "/programs",
        element: <ProgramSelector />,
      },
      {
        path: "/table",
        element: <TablePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routerconfig;
