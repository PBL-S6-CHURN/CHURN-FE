import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logoChurn.png';
import MainLayout from '../../layouts/MainLayout';
import { getProfile, updatePassword, updateProfile } from '../../api/userApi';
import './style.css'
import LoadingScreen from '../../components/LoadingScreen';

function AdminProfile({ onLogout, onNavChange, onProfileClick }) {
  const fileInputRef = useRef(null);

  const [adminData, setAdminData] = useState({username: "", email: ""});
  const [isEditingPw, setIsEditingPw] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [pwStep, setPwStep] = useState(1);
  const [loading, setLoading] = useState(true);

  //Upload Foto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Simpan Password Baru
  const savePassword = async () => {
    if (!typedPassword.trim()) {
      alert("Kolom password tidak boleh kosong!");
      return;
    }

    if (pwStep === 1) {
      // Simpan inputan pertama sebagai password lama secara rahasia
      setOldPassword(typedPassword);
      setTypedPassword(""); // Kosongkan input untuk ketikan berikutnya
      setPwStep(2); // Alihkan langkah ke password baru
    } else if (pwStep === 2) {
      try {
        setLoading(true);
        
        // Eksekusi fungsi API bawaan backend Anda yang membutuhkan 2 parameter
        await updatePassword(oldPassword, typedPassword);
        
        setTimeout(() => {
          setLoading(false);
          alert("Password berhasil diperbarui!");
          setTypedPassword("");
          setOldPassword("");
          setPwStep(1);
          setIsEditingPw(false);
        }, 800);
        
        // Reset seluruh state alur password kembali ke default
        setTypedPassword("");
        setOldPassword("");
        setPwStep(1);
        setIsEditingPw(false);
      } catch (error) {
        console.error("Gagal update password:", error);
        alert(error || "Terjadi kesalahan saat memperbarui password.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await updateProfile(adminData.username, adminData.email, selectedFile);

      setTimeout(() => {
        setLoading(false);
        alert("Profil berhasil diperbarui!");
        if (selectedFile) {
          setPreviewImage(URL.createObjectURL(selectedFile));
        }
        setSelectedFile(null);
      }, 800);

      // Opsional: Refresh hal  aman atau update ulang state data dari response server jika ada rute image baru
      if(selectedFile) {
        setPreviewImage(URL.createObjectURL(selectedFile));
      } else if (result?.data?.profile_image) {
        setPreviewImage(`http://localhost:8000/${result?.data?.profile_image || result?.profile_image}`);
      }

      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const response = await getProfile();
        const userData = response.data.message;
        console.log(userData)

        if (userData) {
          setAdminData(userData);

          if (userData.profile_image) {
            const finalImageUrl = `http://localhost:8000/${userData.profile_image}`;
            setPreviewImage(finalImageUrl);
          }
        }

        // setTempPw(userData.password || "");
        setLoading(false);
        setTimeout(() => setLoading(false), 700);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  // Tampilan Loading
  if (loading && !adminData.username) {
    return (
      <MainLayout title="Profil Admin" activeNav="profile" onNavChange={onNavChange} onLogout={onLogout} adminData={adminData} onProfileClick={onProfileClick} >
        <LoadingScreen message='Sedang Memproses' />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Profil Admin"
      activeNav="profile"
      onNavChange={onNavChange}
      onLogout={onLogout}
      adminData={adminData}
      onProfileClick={onProfileClick}
    >
    <div className="card-profile">
          <div className="profile-section">
            <div className='profile-avatar-wrapper'>
              <div 
                className="profile-avatar-large" 
                onClick={() => fileInputRef.current.click()}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Profile" />
                ) : (
                  <img src={logo} alt="Default" />
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} style={{ display: 'none' }} accept="image/*" />
              <p className='title-upload'>Klik untuk Ganti Foto</p>
            </div>
            <div className="profile-info">
              <form onSubmit={handleSaveChanges}>
                <div className='input-group'>
                  <label style={{ fontSize: '0.8rem', color: '#888' }}>Nama Admin</label>
                  <input 
                    type="text" 
                    className="filter-select" 
                    value={adminData.username || ""}
                    onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                  />
                </div>
                <div className='input-group'>
                  <label style={{ fontSize: '0.8rem', color: '#888' }}>Email</label>
                  <input 
                    type="email" 
                    className="filter-select" 
                    value={adminData.email || ""}
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  />
                </div>
                <div className='input-group'>
                  <label style={{ fontSize: '0.8rem', color: '#888' }}>Password</label>
                  <input 
                    type={isEditingPw ? "text" : "password"}
                    className="filter-select" 
                    value={isEditingPw ? typedPassword : "********"}
                    onChange={(e) => setTypedPassword(e.target.value)}
                    placeholder={isEditingPw ? (pwStep === 1 ? "Ketik password lama di sini..." : "Ketik password baru di sini...") : ""}
                  />
                </div>
                <div className='btn-group'>
                  <button 
                    className="btn-logout-new" 
                    style={{ flex: 1, margin: 0, borderRadius: '8px' }}
                    onClick={() => alert("Perubahan Nama & Foto Berhasil!")}
                  >
                    Simpan Perubahan
                  </button>
                  
                  {isEditingPw ? (
                    <button 
                      className="select-tool" 
                      style={{ flex: 1, border: '1px solid #630000', borderRadius: '8px', background: '#630000', color: 'white' }}
                      onClick={savePassword}
                    >
                      Konfirmasi Password Baru
                    </button>
                  ) : (
                    <button 
                      className="select-tool" 
                      style={{ flex: 1, border: '1px solid #630000', borderRadius: '8px' }}
                      onClick={() => setIsEditingPw(true)}
                    >
                      Ubah Password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
    </MainLayout>
  );
}

export default AdminProfile;