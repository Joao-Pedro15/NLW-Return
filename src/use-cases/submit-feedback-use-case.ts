import { MailAdapter } from "../adapters/email-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest{
    type: string
    commment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const { type, commment, screenshot } = request

        if(!type) { 
            throw new Error('Type is required') 
        }

        if(!commment) { 
            throw new Error('Type is required') 
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format')
        }

        await this.feedbacksRepository.create({
            type,
            commment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentario: ${commment}</p>`,
                '</div>'
            ].join('\n')
        })
    }
}