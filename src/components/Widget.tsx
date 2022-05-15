import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'
// O Popover fica responsável pelas mundanças de estado e ele é umna lib de acessibilidade, sendo assim ele fica responsável pelos arias para leitores de tela

export function Widget(){
    

    return (
        <Popover className='absolute bottom-5 right-5'>
            <Popover.Panel>Hello world</Popover.Panel>
            
            <Popover.Button className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group'>
                <ChatTeardropDots className='w-6 h-6' />
                
                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    <span className='pl-2'></span>
                    Feedback
                </span>
            </Popover.Button>
        </Popover>
    )
} 