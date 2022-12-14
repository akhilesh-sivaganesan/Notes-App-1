import Form from "../components/Form";
import TodoList from "../components/TodoList";
import SnapshotSet from "../components/SnapshotSet"
import { Container, Grid } from "@mui/material"
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/recoil_state";

export default function Home() {
  const [showModal, setShowModal] = useRecoilState(modalState)
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
      {showModal && <Modal/>}
    </Container>
  )
}
