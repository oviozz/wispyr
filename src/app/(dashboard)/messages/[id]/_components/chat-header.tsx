export default function ChatHeader() {

    return (
        <div className={"flex items-center justify-between border-b px-4 py-1.5 shrink-0"}>
            <h2 className="font-semibold">John Doe 🎉</h2>

            <div className="flex -space-x-4 rtl:space-x-reverse">
                <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                     src="https://github.com/shadcn.png" alt=""/>
                <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                     src="https://github.com/shadcn.png" alt=""/>
                <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                     src="https://github.com/shadcn.png" alt=""/>
                <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-blue-500 border-2 border-blue-700 rounded-full hover:bg-blue-600 dark:border-blue-700"
                   href="#">+2
                </a>
            </div>
        </div>
    )

}