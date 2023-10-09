export function CustomTextArea(
    {
        text, setText, placeHolder
    }: {
        text: string, setText(text: string): void, placeHolder?: string
    }) {
    return (
        <div className="m-[0_16px_16px_16px] grid flex-1">
            <textarea
                value={text}
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value)
                }}
                placeholder={placeHolder}
                className="text-black text-[15px] min-w-fit p-1"
            />
        </div>
    );
}