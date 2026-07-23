# MeterBar

Uma métrica por linha: rótulo, valor, uma trilha com a barra do valor e a marca da meta, e o benchmark escrito por extenso. É um **bullet chart** compacto (Stephen Few, 2006), a alternativa ao medidor radial quando várias métricas precisam ser lidas contra suas metas de uma vez só.

## Quando usar

- Um conjunto de métricas que só faz sentido contra uma meta: reply rate vs. benchmark, deliverability vs. mínimo aceitável, bounce rate vs. teto contratado.
- Quando o leitor precisa responder "estamos dentro do combinado?" antes de responder "qual é o número?".
- Empilhado dentro de um `Card`, sempre envolto por `MeterList`: é o `MeterList` que faz todas as linhas compartilharem a mesma grade (rótulo, valor, trilha e nota em colunas únicas). Sem ele, cada barra dimensiona as próprias colunas e o conjunto volta a parecer empilhado.
- Linhas deixadas na escala padrão (`target * 1.5`) compartilham régua e as marcas caem no mesmo x. Métricas com teto natural (percentual de um todo, score 0–100) devem receber `max` explícito: a régua honesta vale mais que o alinhamento.

## Quando NÃO usar

- Para um número herói sem meta (total de leads, reuniões marcadas). Use `StatCard`.
- Para UMA métrica de assinatura numa escala 0–100 em que a peça visual importa. Use `Gauge`.
- Para tendência ao longo do tempo. Use `Sparkline` ou `LineChart`.
- Para comparar categorias entre si (e não contra metas). Use `BarChart`.

## Variantes

Sem variantes formais. Dois eixos de configuração:

| Eixo | Valores | Efeito |
|---|---|---|
| `emphasis` | `default` \| `lead` | `lead` aumenta o valor (20px → 32px). Use em no máximo uma linha por grupo. |
| `tone` | `auto` \| `neutral` \| `success` \| `warning` \| `error` | Cor da barra. `auto` mantém neutra a linha dentro da meta. |

## Estados

Componente de apresentação, sem estados interativos.

| Situação | Comportamento |
|---|---|
| Dentro da meta | Barra neutra (`--dp-color-primary`) + ✓ na nota. Cor marca exceção, não normalidade: se toda linha ficasse verde, nenhuma se destacaria. |
| Erra a meta por até 15% | Barra em `--dp-color-warning`. |
| Erra por mais de 15% | Barra em `--dp-color-error`. |
| Sem `target` | Sem marca e sem nota; a barra usa `max` (ou o próprio valor) como escala e fica neutra. |
| Valor acima da escala | Barra clampada em 100% da trilha; o número textual continua exato. |
| Coluna estreita (< 380px) | A linha se reorganiza: rótulo + valor em cima, trilha e nota em linhas próprias (container query, mede a coluna e não a viewport). |

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | — (obrigatória) | Nome da métrica. |
| `value` | `number` | — (obrigatória) | Valor atual, na unidade da métrica. |
| `target` | `number` | `undefined` | Meta. Dirige a marca, o tom e a nota. |
| `better` | `'higher' \| 'lower'` | `'higher'` | `'lower'` para métricas em que menos é melhor (bounce rate). |
| `max` | `number` | `target * 1.5` | Fim da régua. Linhas no default compartilham régua (marcas alinhadas); passe explícito em métricas com teto natural (`max={100}`). |
| `format` | `(v: number) => string` | `String` | Formata valor e meta na exibição. |
| `targetLabel` | `string` | `target {meta}` | Sobrescreve a nota gerada. |
| `note` | `ReactNode` | `undefined` | Complemento à direita (ex.: banda qualitativa "Strong"). |
| `emphasis` | `'default' \| 'lead'` | `'default'` | `lead` aumenta o valor. |
| `tone` | `MeterBarTone` | `'auto'` | Força a cor da barra. |
| `className` | `string` | `undefined` | Classe extra no wrapper. |

Tipo auxiliar exportado: `MeterBarTone` = `'auto' | 'neutral' | 'success' | 'warning' | 'error'`.

## Exemplo de uso

```tsx
import { MeterBar, MeterList } from '@digital-pampas/ds'

const pct = (v: number) => `${v.toFixed(1)}%`

<MeterList>
  <MeterBar label="Reply rate" value={4.1} target={3} format={pct} emphasis="lead" />
  <MeterBar label="Bounce rate" value={1.1} target={2} better="lower" format={pct} />
  <MeterBar label="Reputation" value={92} target={85} max={100} format={(v) => `${v}/100`} />
</MeterList>
```

`MeterList` aceita filhos que não são `MeterBar` (um sub-cabeçalho de grupo, um gráfico): basta dar a eles `grid-column: 1 / -1` no CSS do produto para que ocupem a linha inteira da grade, como faz o portal nos cards de canal.

## Acessibilidade

- A barra é `aria-hidden`: rótulo, valor e nota já são texto real, então o leitor de tela recebe a informação uma vez, não duas.
- O ✓ de meta batida é um SVG decorativo acompanhado de texto visualmente oculto ("target met"), então a informação não depende do glifo nem da cor.
- Valores usam `font-variant-numeric: tabular-nums`, o que alinha os dígitos em coluna sem precisar de tabela.
- A transição da largura da barra é desligada sob `prefers-reduced-motion`.
- Consumidor deve garantir: `better="lower"` nas métricas invertidas, senão o tom (e o ✓) comunicam o oposto do que o dado diz.

## Dependências

**Tokens consumidos:** `--dp-space-87`, `--dp-space-100`, `--dp-space-150`, `--dp-space-50`, `--dp-sem-font-body`, `--dp-sem-font-display`, `--dp-sem-font-code`, `--dp-font-size-87`, `--dp-font-size-150`, `--dp-font-size-250`, `--dp-font-size-62`, `--dp-font-weight-semibold`, `--dp-radius-pill`, `--dp-sem-motion-layout`, `--dp-color-on-surface`, `--dp-color-on-surface-variant`, `--dp-color-surface-container`, `--dp-color-primary`, `--dp-color-warning`, `--dp-color-error`, `--dp-color-success-text`.

**Componentes do DS usados:** nenhum.

---
*Fonte da verdade: o código deste diretório. Documentação do showroom: seção "MeterBar" (Portal) no showroom do DS.*
