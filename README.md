# CrewRun

App fitness social focado em corrida, musculação e crews.

-----

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar no Expo Go

```bash
npx expo start
```

Escaneie o QR code com o Expo Go no iPhone.

-----

## Estrutura

```
crewrun/
├── App.js                    # Entry point, navegação
├── app.json                  # Config Expo
├── src/
│   ├── theme.js              # Design system (cores, fontes, espaçamentos)
│   ├── data/
│   │   └── mock.js           # Dados mock (substituir por Supabase futuramente)
│   ├── components/
│   │   └── BottomNav.js      # Navegação inferior
│   └── screens/
│       ├── HomeScreen.js     # Dashboard pessoal + eventos
│       ├── WorkoutScreen.js  # Fichas A/B/C + registro de séries
│       ├── CrewScreen.js     # Crews favoritas + agenda + explorar
│       └── ProfileScreen.js  # Peso, PRs, fotos de evolução
```

-----

## Telas

- **Home** — streak, próximos eventos das crews, histórico de treinos
- **Treino** — fichas A/B/C, exercícios com séries/reps/carga, check de conclusão
- **Crew** — crews favoritas, agenda confirmada, explorar crews por localidade
- **Perfil** — evolução de peso, recordes pessoais, fotos privadas

-----

## Próximos passos

- [ ] Integrar Supabase (auth + banco de dados)
- [ ] Substituir mock.js por dados reais
- [ ] Cadastro de treino por foto com IA
- [ ] GPS para corridas (V2)
- [ ] Apple Health integration (V2)