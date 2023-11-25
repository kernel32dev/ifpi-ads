// arquivo criado para q6

export class AplicacaoError extends Error {}

export class ContaCodigoRepetidoError extends AplicacaoError {}

export class ContaInexistenteError extends AplicacaoError {}

export class SaldoInsuficienteError extends AplicacaoError {}

export class SaldoNegativoError extends AplicacaoError {}

export class DepositoNegativoError extends AplicacaoError {}
