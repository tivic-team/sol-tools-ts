# 📊 Chart Tools

Ferramenta que, a partir da biblioteca [ChartJS](https://www.chartjs.org/docs/2.9.4/), fornece uma estrutura para realizar a plotagem de gráficos.

## Utilização

É necessário definir no HTML um elemento do tipo [Canvas](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API/) e atribuí-lo um id. Após isso, no código TypeScript deve ser realizada a chamada do método construtor de algum dos gráficos, fornecendo, para tal, um objeto do tipo `IChartOptions`. Após a instanciação, o método `plot()` deve ser executado para que o gráfico seja plotado no canvas desejado.

Exemplo:

```ts
const data = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  datasets: [{ data: [5, 2, 3] }],
};

new PizzaChart({
  canvasId: 'ait-ranking-natureza',
  data,
}).plot();
```

As opções de personalização do gráfico estão definidas na interface `IChartOptions`.
