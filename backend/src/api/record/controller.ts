import { Record } from './model';

export const getRecord = (recordID) => { return Record.find({ id_record: { $in: [`${recordID}`] } }); };

export const getRecords = () => { return Record.find(); };

export const newRecord = (record) => { 
  const recordToCreate = new Record({ ...record });
  return recordToCreate.save(); 
};

export const updateRecord = (record, recordID) => { return record.findOneAndUpdate({ id_record: { $in: [`${recordID}`] } }, { $set: record }, { new: true }); };

export const deleteRecord = (recordID) => { return Record.findOneAndRemove({ id_record: { $in: [`${recordID}`] } }); };
