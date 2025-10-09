import App from "./App";
import GetStarted from "./get-started";
import TablePage from "./table-page";

const routerconfig = [
    {
        path:"/", 
        element:<App/>,
        children: [
            {
                index: true, element: <GetStarted />
            },
            {
                path: "/table-page", element: <TablePage />,
            }
        ]
    }
]


export default routerconfig;