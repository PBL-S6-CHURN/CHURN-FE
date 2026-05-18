import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logoChurn.png';
import MainLayout from '../../layouts/MainLayout';
import { getProfile, updatePassword, updateProfile } from '../../api/userApi';

function AdminProfile({ onLogout, onNavChange, highRiskCustomers, onProfileClick }) {
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
        
        alert("Password berhasil diperbarui!");
        
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

      alert("Profil berhasil diperbarui!");

      // Opsional: Refresh halaman atau update ulang state data dari response server jika ada rute image baru
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

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  // Tampilan Loading
  if (loading) {
    return (
      <MainLayout title="Profil Admin" activeNav="profile" onNavChange={onNavChange} onLogout={onLogout} adminData={adminData} onProfileClick={onProfileClick} highRiskCustomers={highRiskCustomers}>
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#630000' }}>
          <h3>Memuat data profil...</h3>
        </div>
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
      highRiskCustomers={highRiskCustomers}
    >
    <div className="card" style={{ maxWidth: '1200px', margin: '30px auto', padding: '40px' }}>
          <div className="profile-section" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div 
                className="profile-avatar-large" 
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '160px', height: '160px', borderRadius: '50%',
                  backgroundColor: '#EEEBDD', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', border: '4px solid #630000',
                  cursor: 'pointer', overflow: 'hidden'
                }}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={logo} alt="Default" style={{ width: '70%', opacity: '0.5' }} />
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} style={{ display: 'none' }} accept="image/*" />
              <p style={{ fontSize: '0.7rem', color: '#630000', marginTop: '10px', fontWeight: 'bold' }}>Klik untuk Ganti Foto</p>
            </div>
            <div className="profile-info" style={{ flex: 1 }}>
            <form onSubmit={handleSaveChanges}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.8rem', color: '#888' }}>Nama Admin</label>
                <input 
                  type="text" 
                  className="filter-select" 
                  style={{ width: '100%', background: '#f9f9f9', border: '1px solid #ddd', padding: '12px' }}
                  value={adminData.username || ""}
                  onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.8rem', color: '#888' }}>Email</label>
                <input 
                  type="email" 
                  className="filter-select" 
                  style={{ width: '100%', background: '#f9f9f9', border: '1px solid #ddd', padding: '12px' }}
                  value={adminData.email || ""}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.8rem', color: '#888' }}>Password</label>
                <input 
                  type={isEditingPw ? "text" : "password"}
                  className="filter-select" 
                  style={{ width: '100%', background: '#f9f9f9', border: '1px solid #ddd', padding: '12px' }}
                  value={isEditingPw ? typedPassword : "********"}
                  onChange={(e) => setTypedPassword(e.target.value)}
                  placeholder={isEditingPw ? (pwStep === 1 ? "Ketik password lama di sini..." : "Ketik password baru di sini...") : ""}
                />
              </div>
              <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
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