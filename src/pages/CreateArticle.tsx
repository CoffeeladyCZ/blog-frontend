export {};
// import React, { useState } from 'react';
// // import axios from 'axios'; // smazat po vyzkoušení
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useForm } from 'react-hook-form';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// import { CircularProgress, Grid, Button, Box, TextField, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import MarkdownEditor from '@uiw/react-md-editor';

// import LoginPage from './LoginPage';
// import { Article } from '../model/Articles';

// type FormValues = {
//   title: string;
//   image: string;
//   content: string;
// };

// const StyledTypography = styled(Typography)`
//   font-size: 32px;
// `;

// const StyledBox = styled(Box)`
//   margin-top: 50px;
//   display: flex;
//   justify-content: center;
// `;

// const StyledGrid = styled(Grid)`
//   max-width: 1152px;
// `;

// const CreateArticle: React.FC = () => {
//   const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<FormValues>({
//     mode: 'onChange'
//   });

//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     console.log('submit');
//     event?.preventDefault();
//     await createNewArticleMutation.mutate();
//   };

//   const createArticle = async () => {
//     const articleData = FormData;
//     const response = await axios.post('/articles', articleData);
//     return response.data;
//   };

//   const createNewArticleMutation = useMutation({
//     mutationFn: () => createArticle(),
//     onSuccess: ({ data, errors }) => {
//       queryClient.invalidateQueries({ queryKey: ['articles'] });
//     }
//   });

//   // const createArticle = async (data: FormValues) => {
//   //   const config = {
//   //     headers: {
//   //       'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
//   //     }
//   //   };

//   //   try {
//   //     console.log('token new article', Cookies.get('token'));
//   //     await api.post('/articles', data, config);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   if (!Cookies.get('token')) return <LoginPage />;

//   if (isLoading) {
//     return <CircularProgress />;
//   }

//   return (
//     <StyledBox>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <StyledGrid container rowSpacing={3}>
//           <Grid item xs={4}>
//             <StyledTypography variant="h1">Create new article</StyledTypography>
//           </Grid>
//           <Grid item xs={3}>
//             <Button variant="contained">Publish Article</Button>
//           </Grid>
//           <Grid item xs={8}>
//             <TextField
//               label="Article title"
//               {...register('title', {
//                 required: 'Error'
//               })}
//               error={Boolean(errors.title)}
//               helperText={errors.title?.message}
//               id="title"
//               placeholder="My First Article"
//               size="small"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={8}>
//             <MarkdownEditor id="content" value={content} height={500} data-color-mode="light" />
//           </Grid>
//         </StyledGrid>
//       </form>
//     </StyledBox>
//   );
// };

// export default CreateArticle;
