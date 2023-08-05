// import * as React from "react";
// import { FieldType } from "../../utils/types";
// import { useIntl } from "react-intl";
// /*
//  * Strapi Design system
//  */
// import {
//   Box,
//   Flex,
//   Grid,
//   GridItem,
//   IconButtonGroup,
//   IconButton,
//   Typography,
// } from "@strapi/design-system";

// import { ArrowDown, ArrowUp, Trash, Pencil } from "@strapi/icons";
// import fieldMap from "./FieldMap";
// import { FieldDirectionEnum } from "../../utils/enums";
// import pluginId from "../../pluginId";

// const FormField = ({
//   name,
//   label,
//   type,
//   config,
//   options,
//   position,
//   canMoveDown,
//   canMoveUp,
//   move,
//   edit,
//   remove,
// }: FieldProps) => {
//   const { formatMessage } = useIntl();

//   const Content = fieldMap.get(type!);

//   if (!Content) {
//     return <></>;
//   }

//   return (
//     <Box
//       borderColor="neutral150"
//       shadow="tableShadow"
//       hasRadius={true}
//       paddingLeft={4}
//       paddingRight={4}
//       paddingTop={2}
//       paddingBottom={2}
//     >
//       <Grid>
//         <GridItem padding={1} paddingLeft={0} col={7} s={12}>
//           <Content
//             label={label}
//             required={config.required}
//             config={config}
//             name={name}
//             options={options}
//             disabled={true}
//           />
//         </GridItem>
//         <GridItem padding={1} col={2} s={6}>
//           <Box paddingLeft={8}>
//             <Typography variant="pi" fontWeight="bold">
//               {formatMessage({ id: `${pluginId}.forms.fields.info` })}
//             </Typography>
//             <Flex justifyContent="space-between">
//               <Box paddingTop={2}>
//                 <Box paddingBottom={2}>
//                   <Typography variant="pi" fontWeight="semiBold">
//                     {formatMessage({ id:  `${pluginId}.forms.fields.field_type` })}
//                   </Typography>
//                 </Box>
//                 <Box paddingBottom={2}>
//                   <Typography variant="pi" fontWeight="semiBold">
//                     {formatMessage({
//                       id: `${pluginId}.forms.fields.extra_props.required`,
//                     })}
//                     :
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box paddingTop={2}>
//                 <Box paddingBottom={2}>
//                   <Typography variant="pi">
//                     {formatMessage({
//                       id:  `${pluginId}.forms.fields.types.${type}`,
//                     })}
//                   </Typography>
//                 </Box>
//                 <Box paddingBottom={2}>
//                   <Typography variant="pi">
//                     {formatMessage({
//                       id:  `${pluginId}.${config.required.toString()}`,
//                     })}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Flex>
//           </Box>
//         </GridItem>
//         <GridItem padding={1} col={3} s={6}>
//           <Flex justifyContent="end">
//             <Box>
//               <Box paddingBottom={2}>
//                 <Typography variant="pi" fontWeight="bold">
//                   {formatMessage({ id: `${pluginId}.forms.fields.actions` })}
//                 </Typography>
//               </Box>
//               <IconButtonGroup>
//                 <IconButton
//                   onClick={() => move(position, FieldDirectionEnum.Up)}
//                   disabled={!canMoveUp}
//                   label={formatMessage({
//                     id: `${pluginId}.forms.fields.actions.up`,
//                   })}
//                   icon={<ArrowUp />}
//                 />
//                 <IconButton
//                   onClick={() => move(position, FieldDirectionEnum.Down)}
//                   disabled={!canMoveDown}
//                   label={formatMessage({
//                     id: `${pluginId}.forms.fields.actions.down`,
//                   })}
//                   icon={<ArrowDown />}
//                 />
//                 <IconButton
//                   onClick={() => edit(position)}
//                   label={formatMessage({
//                     id: `${pluginId}.forms.fields.actions.edit`,
//                   })}
//                   icon={<Pencil />}
//                 />
//                 <IconButton
//                   onClick={() => remove(position)}
//                   label={formatMessage({
//                     id: `${pluginId}.forms.fields.actions.remove`,
//                   })}
//                   icon={<Trash />}
//                 />
//               </IconButtonGroup>
//             </Box>
//           </Flex>
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// };

// FormField.defaultProps = {
//   canMoveUp: false,
//   canMoveDown: false,
// };

// export default FormField;
