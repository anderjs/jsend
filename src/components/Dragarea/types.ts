/* eslint-disable @typescript-eslint/no-explicit-any */

export type DragareaProps = {
  color?: string;
  width?: number;
  height?: number;
  filename?: string;
  message?: string;
  status?: DropStatus;
  borderColor?: string;
  wrongColor?: string;
  successColor?: string;
  maxFileSize?: number;
  backgroundColor?: string;
  isDragActive?: boolean;
  onFileUpload?: (file: File) => void;
  setIsDragActive?: (active: boolean) => void;
  acceptedFileType?: { [type: string]: any[] };
  onStatusChange?: (status: DropStatus) => void;
  onFileNameChange?: (filename: string) => void;
  statusMessages?: Record<DropStatus, string[]>;
  statusColors?: Partial<Record<DropStatus, string>>;
  statusBorder?: Partial<Record<DropStatus, string>>;
  statusIcons?: Partial<Record<DropStatus, React.ComponentType<any>>>;
};


export enum DropStatus {
  DragActive = 1,
  FileEmpty = 2,
  InvalidType = 3,
  FileTooBig = 4,
  WithError = 5,
  Reload = 6,
  TooManyParticipants = 7,
  MoreThanFifteen = 8,
  MissingField = 9
}