import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Printer,
  Sparkles,
  RotateCcw,
  ArrowRight,
  QrCode,
  ShieldCheck,
  Calendar,
  Phone,
  User,
  MapPin,
  CreditCard,
  FileCheck
} from 'lucide-react';
import { StudentRecord, FeeChallan } from '../../types';
import { useSchool } from '../../context/SchoolContext';

interface NewAdmissionTabProps {
  studentsCount: number;
  onStudentAdmitted: (student: StudentRecord, challan: FeeChallan) => void;
  onViewAllStudents: () => void;
  showToast: (msg: string) => void;
}

export const NewAdmissionTab: React.FC<NewAdmissionTabProps> = ({
  studentsCount,
  onStudentAdmitted,
  onViewAllStudents,
  showToast,
}) => {
  const { settings } = useSchool();

  // Form fields
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [grade, setGrade] = useState('Grade 8');
  const [section, setSection] = useState('Section A');
  const [rollNo, setRollNo] = useState(`8A-${studentsCount + 1}`);
  const [dob, setDob] = useState('2012-05-18');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [phone, setPhone] = useState('+92 300 9876543');
  const [whatsapp, setWhatsapp] = useState('+92 300 9876543');
  const [cnic, setCnic] = useState('37405-1234567-9');
  const [occupation, setOccupation] = useState('Civil Engineer');
  const [monthlyFee, setMonthlyFee] = useState('4500');
  const [admissionFee, setAdmissionFee] = useState('6000');
  const [address, setAddress] = useState('House # 12, Street 4, Sector G-10/2, Islamabad');
  const [prevSchool, setPrevSchool] = useState('Army Public School & College (Passed with 88%)');

  // Success certificate state
  const [admittedRecord, setAdmittedRecord] = useState<{
    student: StudentRecord;
    challan: FeeChallan;
  } | null>(null);

  // Fill sample data for 1-click test
  const handleAutoFillSample = () => {
    setStudentName('Muhammad Rayyan');
    setFatherName('Tariq Mehmood');
    setGrade('Grade 8');
    setSection('Section A');
    setRollNo(`8A-${studentsCount + 1}`);
    setDob('2012-06-20');
    setGender('Male');
    setBloodGroup('O+');
    setPhone('+92 301 5554321');
    setWhatsapp('+92 301 5554321');
    setCnic('61101-7890123-5');
    setOccupation('Chartered Accountant');
    setMonthlyFee('4500');
    setAdmissionFee('6000');
    setAddress('Executive Heights, Flat 402, F-11 Markaz, Islamabad');
    setPrevSchool('Beaconhouse School System (Passed with 92%)');
    showToast('Auto-filled sample student bio-data');
  };

  const handleReset = () => {
    setStudentName('');
    setFatherName('');
    setGrade('Grade 8');
    setSection('Section A');
    setRollNo(`8A-${studentsCount + 1}`);
    setPhone('+92 300 ');
    setWhatsapp('+92 300 ');
    setCnic('');
    setOccupation('');
    setMonthlyFee('4000');
    setAdmissionFee('5000');
    setAddress('');
    setPrevSchool('');
    setAdmittedRecord(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !fatherName.trim()) {
      showToast('Please enter both Student Name and Father Name');
      return;
    }

    const regId = `SM-ST-${Date.now().toString().slice(-4)}`;
    const challanNo = `CH-2026-${Date.now().toString().slice(-4)}`;

    const newStudent: StudentRecord = {
      id: regId,
      rollNo: rollNo.trim() || `8A-${studentsCount + 1}`,
      name: studentName.trim(),
      grade: grade,
      section: section.replace('Section ', ''),
      guardianName: fatherName.trim(),
      phone: phone.trim() || '+92 300 0000000',
      attendance: 100,
      feeStatus: 'Paid',
      monthlyFee: Number(monthlyFee) || 4000,
      avatarColor: 'bg-emerald-100 text-emerald-800',
    };

    const newChallan: FeeChallan = {
      id: `CH-${Date.now()}`,
      challanNo: challanNo,
      studentName: studentName.trim(),
      grade: grade,
      amount: Number(monthlyFee) + Number(admissionFee) || 10000,
      month: 'Admission & Sept 2026',
      dueDate: '15 Sep 2026',
      status: 'Paid',
    };

    onStudentAdmitted(newStudent, newChallan);
    setAdmittedRecord({ student: newStudent, challan: newChallan });
    showToast(`Admission confirmed for ${studentName} (Roll #${newStudent.rollNo})`);
  };

  const handlePrintSlip = () => {
    showToast('Sending Admission Slip & Fee Voucher to printer...');
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#19A66A]" />
            <span>Admissions Department ({settings.academicSession})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
            New Student Admission Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#123B2A]/70 mt-0.5">
            Register fresh enrollments into {settings.schoolName} official directory with automated 3-copy fee voucher generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutoFillSample}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="1-Click Auto Fill Demo Data"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#19A66A]" />
            <span>Demo Auto-Fill</span>
          </button>
          <button
            type="button"
            onClick={onViewAllStudents}
            className="px-3.5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>View Enrolled ({studentsCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Success Slip Banner when Admitted */}
      {admittedRecord && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-[#19A66A]/40 shadow-xl relative overflow-hidden animate-in fade-in zoom-in-95">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#19A66A]/10 pointer-events-none blur-xl" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#19A66A]/20">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center font-bold text-2xl shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                  Admission Form Validated & Registered
                </div>
                <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A] mt-1">
                  {admittedRecord.student.name}
                </h3>
                <p className="text-xs text-[#123B2A]/70">
                  Assigned Roll No: <strong className="text-[#19A66A] font-extrabold">{admittedRecord.student.rollNo}</strong> • Class: <strong>{admittedRecord.student.grade} ({admittedRecord.student.section})</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrintSlip}
                className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Admission Slip</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/30 text-[#123B2A] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Admit Another Student</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
              <span className="text-[#123B2A]/60 block mb-0.5 text-[11px]">Father / Guardian</span>
              <strong className="text-[#123B2A]">{admittedRecord.student.guardianName}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
              <span className="text-[#123B2A]/60 block mb-0.5 text-[11px]">Primary Mobile (SMS)</span>
              <strong className="text-[#19A66A]">{admittedRecord.student.phone}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
              <span className="text-[#123B2A]/60 block mb-0.5 text-[11px]">Generated Challan</span>
              <strong className="text-[#123B2A]">{admittedRecord.challan.challanNo}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
              <span className="text-[#123B2A]/60 block mb-0.5 text-[11px]">Initial Amount Billed</span>
              <strong className="text-emerald-700 font-extrabold">Rs. {admittedRecord.challan.amount.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Glass Admission Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(25,166,106,0.06)] space-y-8">
        
        {/* Section 1: Student Personal Bio-Data */}
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#19A66A]/15">
            <User className="w-4 h-4 text-[#19A66A]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
              1. Student Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">
                Student Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Muhammad Rayyan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A] focus:ring-2 focus:ring-[#19A66A]/20 transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">
                Father / Guardian Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A] focus:ring-2 focus:ring-[#19A66A]/20 transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              >
                <option value="B+">B Positive (B+)</option>
                <option value="O+">O Positive (O+)</option>
                <option value="A+">A Positive (A+)</option>
                <option value="AB+">AB Positive (AB+)</option>
                <option value="B-">B Negative (B-)</option>
                <option value="O-">O Negative (O-)</option>
                <option value="A-">A Negative (A-)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Previous School Attended</label>
              <input
                type="text"
                value={prevSchool}
                onChange={(e) => setPrevSchool(e.target.value)}
                placeholder="e.g. Islamabad Model School"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Academic Placement */}
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#19A66A]/15">
            <GraduationCap className="w-4 h-4 text-[#19A66A]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
              2. Academic Placement & Roll Assignment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Admission Class / Grade</label>
              <select
                value={grade}
                onChange={(e) => {
                  setGrade(e.target.value);
                  const num = e.target.value.replace('Grade ', '').replace('Class ', '');
                  setRollNo(`${num}A-${studentsCount + 1}`);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              >
                <option value="Nursery">Nursery / Montessori</option>
                <option value="Prep">Prep / Kindergarten</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9 (Science / Arts)</option>
                <option value="Grade 10">Grade 10 (Matric Board)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Section</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              >
                <option value="Section A">Section A (Morning Wing)</option>
                <option value="Section B">Section B (Senior Wing)</option>
                <option value="Section C">Section C (Girls Wing)</option>
                <option value="Section Rose">Rose Section</option>
                <option value="Section Tulip">Tulip Section</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">
                Official Roll Number <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. 8A-26"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#19A66A] font-extrabold focus:outline-none focus:border-[#19A66A]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Guardian Bio-Data */}
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#19A66A]/15">
            <Phone className="w-4 h-4 text-[#19A66A]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
              3. Parent Contacts & Residential Address
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">
                Father Mobile (SMS Roll Call) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Emergency WhatsApp Contact</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Father CNIC / National ID</label>
              <input
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="61101-1234567-1"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Father Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Government Service / Businessman"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block font-bold text-[#123B2A] mb-1.5">Residential Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Street #, Sector / Colony, City"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Fee Structure & Initial Billing */}
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#19A66A]/15">
            <CreditCard className="w-4 h-4 text-[#19A66A]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
              4. Fee Structure & Bank Challan Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Monthly Tuition Fee (PKR)</label>
              <input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                placeholder="4000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">One-time Admission Registration (PKR)</label>
              <input
                type="number"
                value={admissionFee}
                onChange={(e) => setAdmissionFee(e.target.value)}
                placeholder="5000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1.5">Total Initial Payable Challan</label>
              <div className="px-3.5 py-2.5 rounded-xl bg-[#DDF7E8] border border-[#19A66A]/30 text-emerald-800 font-extrabold text-sm">
                Rs. {(Number(monthlyFee) + Number(admissionFee)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Submission Actions */}
        <div className="pt-4 border-t border-[#19A66A]/15 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reset Inputs</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#19A66A] to-[#147a4f] hover:from-[#158f5b] hover:to-[#106541] text-white text-xs font-extrabold shadow-lg shadow-[#19A66A]/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Issue Admission Voucher</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
