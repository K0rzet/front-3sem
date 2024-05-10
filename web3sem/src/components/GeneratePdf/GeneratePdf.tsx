/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage, Form, Input, Label, SubmitButton } from "../../ui/StyledForm";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";

const PDFDownloadLinkAny: any = PDFDownloadLink;
const TextAny: any = Text;
const ViewAny: any = View;
const DocumentAny: any = Document;
const StyleSheetAny: any = StyleSheet;
const PageAny: any = Page;
const ImageAny: any = Image;

const styles = StyleSheetAny.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
});

interface IDownloadForm {
  title: string;
  bigPoster: File;
}

const MyDocument = ({ data, bigPosterUrl }: { data: IDownloadForm; bigPosterUrl: string }) => (
  <DocumentAny>
    <PageAny size="A4" style={styles.page}>
      <ViewAny style={styles.section}>
        <TextAny>{data.title}</TextAny>
      </ViewAny>
      <ViewAny style={styles.section}>{bigPosterUrl && <ImageAny src={bigPosterUrl} style={styles.image} />}</ViewAny>
    </PageAny>
  </DocumentAny>
);

const GeneratePdf: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<IDownloadForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const [task, setTask] = useState<IDownloadForm>();
  const [bigPosterUrl, setBigPosterUrl] = useState<string>("");

  const saveElement = (data: IDownloadForm) => {
    const file = data.bigPoster;
    if (file) {
      setTask((prevTask) => ({
        ...prevTask!,
        bigPoster: file,
        title: data.title,
      }));
      setBigPosterUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(saveElement)}>
        <Label>
          Название фильма:
          <Input
            {...register("title", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 3,
                message: "Минимальная длина 3 символа",
              },
            })}
          />
          <ErrorMessage>{formState.errors.title?.message}</ErrorMessage>
        </Label>
        <Label>
          Постер:
          <Input
            data-testid="poster"
            type="file"
            accept="image/*"
            {...register("bigPoster", {
              required: "Required",
            })}
            // onChange={(e) => {
            //   const file = e.target.files?.[0];
            //   if (file) {
            //     setTask((prevTask) => ({
            //       ...prevTask!,
            //       bigPoster: file,
            //     }));
            //     setBigPosterUrl(URL.createObjectURL(file));
            //   }
            // }}
          />
          <ErrorMessage>{formState.errors.bigPoster?.message}</ErrorMessage>
        </Label>
        <SubmitButton data-testid={"save-changes"} type="submit" disabled={!formState.isValid}>
          Сохранить изменения
        </SubmitButton>
      </Form>

      {task && bigPosterUrl && (
        <PDFDownloadLinkAny
          data-testid="download-pdf"
          document={<MyDocument data={task} bigPosterUrl={bigPosterUrl} />}
          fileName="form_data.pdf"
        >
          Скачать PDF
        </PDFDownloadLinkAny>
      )}
    </div>
  );
};

export default GeneratePdf;
