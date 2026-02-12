# data-grid

A lightweight, declarative table web component built on [TanStack Table](https://tanstack.com/table) and [Lit](https://lit.dev).

## Usage

```html
<style>
  table {
    font-family: system-ui, sans-serif;
    border-collapse: collapse;
    min-width: 400px;
  }
  th, td {
    padding: 0.6rem 1rem;
    text-align: left;
  }
  th {
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #666;
    border-bottom: 2px solid #e0e0e0;
  }
  td {
    border-bottom: 1px solid #eee;
  }
  tr:hover td {
    background: #f0f0f0;
  }
  button {
    padding: 0.3rem 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
  }
  button:hover {
    background: #f0f0f0;
  }
</style>

<data-grid id="grid">
  <template sort-asc>▲</template>
  <template sort-desc>▼</template>
  <data-col field="id" label="ID" sortable></data-col>
  <data-col field="name" label="Name"></data-col>
  <data-col field="actions">
    <button bind-data-name="name" onclick="alert(this.dataset.name)">Click</button>
  </data-col>
</data-grid>

<script>
  document.getElementById("grid").data = [
    { id: 1, name: "Dita" },
    { id: 2, name: "Peter" },
    { id: 3, name: "Suki" },
  ];
</script>
```

## Roadmap

- Filtering
- Virtualization