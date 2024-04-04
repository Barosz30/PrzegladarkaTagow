
import {
  Box,
  Paper,
} from '@mui/material';
import './App.css'
import SettingsSelectors from './components/settingsSelectors/SettingsSelectors';
import TagsTable from './components/tagsTable/TagsTable';
import useInitialQueryParams from './hooks/useInitialQueryParams';

function App() {
  useInitialQueryParams();
  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
        <Paper
          sx={{
            padding: '10px',
            boxShadow: 'none',
          }}
        >
          <SettingsSelectors />
          <TagsTable />
        </Paper>
      </Box>
    </>
    
  );
}

App.propTypes = {};

export default App
