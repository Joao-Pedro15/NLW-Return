import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//spies = espiões

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    // it or teste
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commment: 'example comment',
            screenshot: 'data:image/png;base64,eoiurgferiug3iurew2r3'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy ).toHaveBeenCalled()

    })

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            commment: 'example comment',
            screenshot: 'data:image/png;base64,eoiurgferiug3iurew2r3'
        })).rejects.toThrow()
    }) 

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commment: '',
            screenshot: 'data:image/png;base64,eoiurgferiug3iurew2r3'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commment: 'example comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow()
    })
})

