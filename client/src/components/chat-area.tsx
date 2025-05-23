
export default function ChatArea() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will go here */}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}