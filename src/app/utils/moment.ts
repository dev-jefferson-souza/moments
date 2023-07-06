import { MessagesService } from '../services/messages/messages.service';

export function handleError(status: number, messageService: MessagesService) {
  const request_errors = [
    { status: 404, message: 'The moment was not found!' },
    { status: 500, message: 'An internal error has occurred' },
  ];

  const error = request_errors.find((error) => error.status === status);
  error
    ? messageService.add(error.message)
    : messageService.add('An error occurred during the request.');
}
