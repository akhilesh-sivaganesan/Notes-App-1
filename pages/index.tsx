import Form from "../components/Form";
import TodoList from "../components/TodoList";
import SnapshotSet from "../components/SnapshotSet"
import { Container, Grid } from "@mui/material"

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TodoList />
        </Grid>
        <Grid item xs={12} md={3}>
          <Form />
        </Grid>
        <Grid item xs={12} md={6}>
          <SnapshotSet />
        </Grid>
      </Grid>
    </Container>
  )
}
