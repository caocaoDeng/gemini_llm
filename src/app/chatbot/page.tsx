import Input from '@/components/Input';

export default function ChatBot () {
    return (
        <main className="flex h-screen">
            <nav className='w-64 border-dashed border border-indigo-600'></nav>
            <div className='flex flex-col flex-1 border-dashed border border-indigo-600'>
                <div className="flex-1 border-dashed border border-indigo-300"></div>
                <div className="flex flex-col justify-center items-center h-20">
                    <Input />
                    <p className='text-xs leading-8 text-slate-500 scale-90'>孩子会犯错，gemini也是</p>
                </div>
            </div>
        </main>
    );
}
