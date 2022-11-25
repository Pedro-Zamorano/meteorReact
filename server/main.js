import { Meteor } from 'meteor/meteor';
import { PacientesCollection } from '/imports/api/PacientesCollection';

const insertTask = taskText => PacientesCollection.insert({ text: taskText });

Meteor.startup(() => {
  if (PacientesCollection.find().count() === 0) {
    [
      'First Task'
    ].forEach(insertTask)
  }
});