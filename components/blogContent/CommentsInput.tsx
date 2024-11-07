export default function CommentsInput() {
    return <div>
        <div className="flex gap-4">
            <textarea className="border-2 border-gray-500 w-3/4  px-3 rounded block" placeholder="Enter your comments..." />
            <button className="border px-6 bg-green-600 text-white py-2 rounded">Send</button>
        </div>
    </div>
}