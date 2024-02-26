import TodoCheckbox from "./common/TodoCheckbox"
import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Grid, GridItem } from "@chakra-ui/react"

const ToDoPage = () => {

    const todoDone = [
        { title: "Login to the dashboard" },
        { title: "Go to the dashboard" },
    ]

    const todoNotDone = [
        { title: "Create Employee" },
        { title: "Create Client" },
    ]

    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl mb-6">To Do List</h1>
            <Grid templateColumns={'repeat(2, 1fr)'} gap={4}>
                <GridItem w={"100%"} className="flex flex-col">
                    <h2 className="text-lg mb-2 text-yellow-600 flex items-center gap-2"><WarningTwoIcon /> Latest to do&apos;s</h2>
                    {todoNotDone.map((item, index) => (
                        <TodoCheckbox key={`done-${index}`} done={false} title={item.title} />
                    ))}
                </GridItem>
                <GridItem w={"100%"} className="flex flex-col">
                    <h2 className="text-lg mb-2 text-green-500 flex items-center gap-2"><CheckIcon /> Latest finished to do&apos;s</h2>
                    {todoDone.map((item, index) => (
                        <TodoCheckbox key={`done-${index}`} done={true} title={item.title} />
                    ))}
                </GridItem>
            </Grid>
        </div>
    )
}

export default ToDoPage