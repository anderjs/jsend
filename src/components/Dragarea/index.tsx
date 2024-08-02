import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dropzone, Message, Input, Label } from "./styled";
import { DragareaProps, DropStatus } from "./types";
import {
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
} from "./svg";

export const Dragarea: React.FunctionComponent<DragareaProps> = React.memo(
  ({
    status,
    filename,
    wrongColor,
    maxFileSize,
    successColor,
    onFileUpload,
    acceptedFileType,
    onStatusChange,
    statusMessages: propStatusMessages,
    statusColors: propStatusColors,
    statusBorder: propStatusBorder,
    statusIcons,

    ...props
  }) => {
    const defaultStatusMessages: Record<number, string []> = {
      [DropStatus.DragActive]: [
        "Mensaje personalizado 1",
        "Mensaje personalizado 2",
      ],
    };

    const defaultStatusColors: Record<number, string>  = {
      [DropStatus.WithError]: "red",
    };

    const defaultStatusBorder: Record<number, string> = {
      [DropStatus.DragActive]: "green",
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      onFileUpload?.(file);
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
      useDropzone({
        accept: acceptedFileType,
        maxSize: maxFileSize,
        maxFiles: 1,
        onDrop,
        onDropRejected: () => {
          if (fileRejections.length > 0) {
            const { code } = fileRejections[0].errors[0];
            switch (code) {
              case "file-too-large":
                onStatusChange?.(DropStatus.FileTooBig);

                break;

              case "file-invalid-type":
                onStatusChange?.(DropStatus.InvalidType);

                break;
            }
          }
        },
      });

    const currentStatus = status || DropStatus.DragActive;
    const Icon = statusIcons?.[currentStatus] || CloudArrowUpIcon;

    status = status || DropStatus.DragActive;

    const text =
      propStatusMessages?.[status] ?? defaultStatusMessages[status] ?? [];

    const color =
      propStatusColors?.[status] ?? defaultStatusColors[status] ?? [];

    const border =
      propStatusBorder?.[status] ?? defaultStatusBorder[status] ?? [];

    return (
      <Dropzone
        {...getRootProps()}
        isDragActive={isDragActive}
        borderColor={border}
        wrongColor={wrongColor}
        successColor={successColor}
        {...props}
      >
        {Icon && <Icon />}

        {status &&
          [DropStatus.WithError, DropStatus.Reload].includes(status) &&
          filename && (
            <Label backgroundColor={color}>
              <DocumentTextIcon /> <p>Archivo cargado:{filename} </p>
            </Label>
          )}

        <Message>
          {text.filter(Boolean).map((msg) => (
            <p key={msg}>{msg}</p>
          ))}
        </Message>
        <Input {...getInputProps()} />
      </Dropzone>
    );
  }
);

Dragarea.defaultProps = {
  maxFileSize: 5 * 1024 * 1024,
  filename: "",
  status: DropStatus.DragActive,
  statusIcons: {
    [DropStatus.DragActive]: CloudArrowUpIcon,
    [DropStatus.InvalidType]: ExclamationTriangleIcon,
    [DropStatus.WithError]: ExclamationTriangleIcon,
    [DropStatus.Reload]: ArrowPathIcon,
  },
};
