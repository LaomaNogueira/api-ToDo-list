export enum EnumServiceError {
  EMAIL_EXISTS = 'E-mail já cadastrado no banco de dados',
  INVALID_DATE = 'A data final não pode ser menor que a data atual',
  INVALID_PERIOD = 'Período inválido',
  NOT_CREATED = 'Não foi possível cadastrar',
  NOT_DELETED = 'Não foi possível deletar o cadastro',
  NOT_FOUND = 'Cadastro não encontrado',
  NOT_UPDATED = 'Não foi possível atualizar o cadastro',
}
