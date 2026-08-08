export interface QueueCase {
  id: string
  patientName: string
  age: number
  microarea: string
  entanglementIndex: number
  reason: string
}

export const researchQueue: QueueCase[] = [
  { id: '9104', patientName: 'Lia', age: 7, microarea: 'Microárea 04', entanglementIndex: 78, reason: 'Ruptura assistencial + relato familiar semelhante' },
  { id: '8821', patientName: 'Rafael', age: 34, microarea: 'Microárea 02', entanglementIndex: 64, reason: 'Peregrinação por 4 especialidades sem resolução' },
  { id: '7732', patientName: 'Marta', age: 41, microarea: 'Microárea 04', entanglementIndex: 58, reason: 'Conexão de sinais com jornada da filha (#9104)' },
  { id: '6650', patientName: 'Davi', age: 12, microarea: 'Microárea 01', entanglementIndex: 51, reason: 'Manifestação precoce + histórico familiar não verificado' },
]
